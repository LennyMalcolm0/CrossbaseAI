import Image from "next/image";

const AuthenticationLayout = ({ children }: { children: React.ReactNode }) => {
    return (  
        <div className="w-full h-[100svh] pb-16 bg-light-300 overflow-y-auto">
            <div className="w-full sm:w-[350px] px-6 mx-auto">
                <Image 
                    src="/crossbase-ai.svg" 
                    alt="crossbase.ai" 
                    width={0} 
                    height={0} 
                    className="h-auto w-auto sm:mx-auto my-10" 
                />
                {children}
            </div>
            <footer className="max-sm:hidden absolute bottom-0 bg-light-400 w-full py-5 
                border-t-2 light-dark-200 text-xs text-dark-400 text-center"
            >
                © 2023 Crossbase Inc.  All Rights Reserved
            </footer>
        </div>
    );
}
 
export default AuthenticationLayout;