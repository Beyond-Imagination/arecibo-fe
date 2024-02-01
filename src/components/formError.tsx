interface Props {
    errorMessage: string
}

export default function FormError({ errorMessage }: Props) {
    return (
        <div className="relative px-4 py-3 mt-2 text-red-700 bg-red-100 border border-red-400 rounded" role="alert">
            <strong className="font-bold">{errorMessage}</strong>
        </div>
    )
}
