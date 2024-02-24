interface Props {
    errorMessage: string
}

export default function FormError({ errorMessage }: Props) {
    return (
        <div className="relative px-2 pt-2 text-[#fe6d70]" role="alert">
            <em className="banSelect">• </em>
            <strong className="text-sm">{errorMessage}</strong>
        </div>
    )
}
