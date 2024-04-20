job("[FE] Merge Request") {
    startOn {
        codeReviewOpened {
            branchToCheckout = CodeReviewBranch.MERGE_REQUEST_SOURCE
        }
        gitPush {
            anyRefMatching {
                +"refs/merge/*/head"
            }
        }
    }

    parallel {
        container(displayName = "build & test", image = "node:alpine") {
            env["REVIEW_ID"] = "{{ run:review.id }}"
            env["PROJECT_ID"] = "{{ run:project.id }}"
            env["SPACE_AUTOMATION_AUTHORIZATION"] = "{{ project:SPACE_AUTOMATION_AUTHORIZATION }}"

            cache {
                // package.json 의 내용을 해시를 하고 그 값을 캐싱키로 사용
                // 이를 통해 package.json 이 동일하면 캐시를 사용하도록 유도하고 달라지면 캐시를 새로 만든다
                // 참고: https://www.jetbrains.com/help/space/cache-files.html#upload-and-reuse-cached-files
                storeKey = "npm-{{ hashFiles('package.json') }}"

                // Fallback 옵션인데 불필요 할것 같아서 주석처리
                /*restoreKeys {
                    +"npm-master"
                }*/

                // 캐시가 들어갈 디렉토리
                localPath = "node_modules"
            }

            shellScript {
                content = """
                    set -e
                    yarn install
                    yarn reviewer &
                    yarn build
                    wait
                """
            }
        }

        container(displayName = "send automation result", image = "gradle:6.1.1-jre11") {
            env["REVIEW_ID"] = "{{ run:review.id }}"
            kotlinScript { api ->
                api.space().chats.messages.sendMessage(
                    channel = ChannelIdentifier.Review(ReviewIdentifier.Id(System.getenv("REVIEW_ID"))),
                    content = ChatMessage.Text(
                        text = api.executionUrl()
                    )
                )
            }
        }
    }
}

job("[FE] Deploy Develop") {
    startOn {
        gitPush {
            anyBranchMatching {
                +"develop"
            }
        }
    }

    container(displayName = "build", image = "node:alpine") {
        shellScript {
            content = """
                yarn install

                echo "NEXT_PUBLIC_NEWRELIC_AGENT_ID={{ project:NEXT_PUBLIC_NEWRELIC_AGENT_ID_DEV }}" >> .env.development
                cp .env.development .env
                rm .env.production

                yarn build
                cp -r out ${'$'}JB_SPACE_FILE_SHARE_PATH/out
            """
        }
    }

    container(displayName = "deploy", image = "amazon/aws-cli") {
        env["AWS_ACCESS_KEY_ID"] = "{{ project:AWS_ACCESS_KEY_ID }}"
        env["AWS_ACCESS_KEY_SECRET"] = "{{ project:AWS_ACCESS_KEY_SECRET }}"

        shellScript {
            content = """
                ls -al ${'$'}JB_SPACE_FILE_SHARE_PATH/out
                aws --version

                export AWS_ACCESS_KEY_ID=${'$'}AWS_ACCESS_KEY_ID
                export AWS_SECRET_ACCESS_KEY=${'$'}AWS_ACCESS_KEY_SECRET
                export AWS_DEFAULT_REGION=ap-northeast-2

                aws s3 sync ${'$'}JB_SPACE_FILE_SHARE_PATH/out s3://arecibo-frontend-dev/out
                aws cloudfront create-invalidation --distribution-id E1VCXNX42JZL2K --paths "/*"
            """
        }
    }
}

job("[FE] Deploy Production") {
    startOn {
        gitPush {
            anyBranchMatching {
                +"main"
            }
        }
    }

    container(displayName = "build", image = "node:alpine") {
        shellScript {
            content = """
                yarn install

                echo "NEXT_PUBLIC_NEWRELIC_AGENT_ID={{ project:NEXT_PUBLIC_NEWRELIC_AGENT_ID_PROD }}" >> .env.production
                cp .env.production .env

                yarn build
                cp -r out ${'$'}JB_SPACE_FILE_SHARE_PATH/out
            """
        }
    }

    container(displayName = "deploy", image = "amazon/aws-cli") {
        env["AWS_ACCESS_KEY_ID"] = "{{ project:AWS_ACCESS_KEY_ID }}"
        env["AWS_ACCESS_KEY_SECRET"] = "{{ project:AWS_ACCESS_KEY_SECRET }}"

        shellScript {
            content = """
                ls -al ${'$'}JB_SPACE_FILE_SHARE_PATH/out
                aws --version

                export AWS_ACCESS_KEY_ID=${'$'}AWS_ACCESS_KEY_ID
                export AWS_SECRET_ACCESS_KEY=${'$'}AWS_ACCESS_KEY_SECRET
                export AWS_DEFAULT_REGION=ap-northeast-2

                aws s3 sync ${'$'}JB_SPACE_FILE_SHARE_PATH/out s3://arecibo-frontend-prod/out
                aws cloudfront create-invalidation --distribution-id EX5I97GANXD0M --paths "/*"
            """
        }
    }
}
