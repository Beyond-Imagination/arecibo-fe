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

    container(displayName = "build & test", image = "node:alpine") {
        shellScript {
            content = """
                set -e
                yarn install
                yarn build
            """
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
                cp .env.development .env
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
