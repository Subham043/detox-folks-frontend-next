export default function Spinner({type="default", color="white"}:{type?:"small"|"default", color?:"white"|"black"}) {

    return <div
        className={`${type === "small" ? "w-4 h-4" : "w-6 h-6"} ${color === "black" ? "text-gray-700" : "text-neutral-100"} inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
        role="status">
        <span
        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span
        >
    </div>
}