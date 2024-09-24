import { Store } from "@/app/models";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FiCheckCircle } from "react-icons/fi";
import { PiWarningOctagonBold } from "react-icons/pi";

type ConnectingStoreStatusProps = {
    creatingStore: boolean;
    createdStore: Store | undefined;
}
const ConnectingStoreStatus = ({creatingStore, createdStore}: ConnectingStoreStatusProps) => {
    const searchParams = useSearchParams();
    const type = searchParams.get("type");

    return ( 
        <div className="fixed inset-0 h-[100svh] w-screen bg-dark-100 bg-opacity-70 bg-blur-[12px] grid place-content-center">
            <div className="w-[430px] max-w-[92vw] mx-auto p-5 rounded-[20px] bg-light-400 border-2 border-light-200">
                {creatingStore ? (
                    <div className="flex gap-1.5 loading-bars h-[40px]">
                        <div className="h-[40px] w-2 my-auto rounded-lg bg-primary-100 loading-bar" />
                        <div className="h-[40px] w-2 my-auto rounded-lg bg-primary-100 loading-bar" />
                        <div className="h-[40px] w-2 my-auto rounded-lg bg-primary-100 loading-bar" />
                        <div className="h-[40px] w-2 my-auto rounded-lg bg-primary-100 loading-bar" />
                    </div>
                ):(<>
                    {createdStore ? (
                        <FiCheckCircle className="text-[40px] text-primary-300" />
                    ):(
                        <PiWarningOctagonBold className="text-[40px] text-primary-200" />
                    )}
                </>)}

                <Image 
                    src={`/integrations/${type?.toLowerCase() || ""}.svg`}
                    alt={type?.toLowerCase() || ""}
                    width={0} 
                    height={0} 
                    className="h-6 w-auto mt-6 mb-3.5" 
                />

                {creatingStore ? (
                    <p className="text-dark-400">
                        Connecting your <span className="capitalize"> {type?.toLowerCase()} </span> store. Please wait...
                    </p>
                ):(<>
                    {createdStore ? (
                        <p className="text-dark-400">
                            Connection successful. 
                            <Link href="/" className="text-primary-400 font-bold"> Go to homepage</Link>
                        </p>
                    ):(
                        <p className="text-dark-400">
                            Failed to connect store.
                            <Link href="/" className="text-primary-400 font-bold"> Try again</Link>
                        </p>
                    )}
                </>)}
            </div>
        </div>
    );
}
 
export default ConnectingStoreStatus;