export default function Spinner({type="default"}:{type?:"small"|"default"}) {

    return <div
        className={`${type === "small" ? "w-4 h-4" : "w-6 h-6"} inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]`}
        role="status">
        <span
        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span
        >
    </div>
}