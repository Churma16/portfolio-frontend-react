import {CgSpinner} from "react-icons/cg";

export default function LoadingSpinner() {
    return (<div className="flex items-center justify-center py-12">
        <CgSpinner className="animate-spin w-8 h-8 text-primary"/>
    </div>)
}