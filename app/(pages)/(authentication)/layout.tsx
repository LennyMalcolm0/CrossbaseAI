import Image from "next/image";

const AuthenticationLayout = ({ children }: { children: React.ReactNode }) => {
    return (  
        <div className="w-full h-[100svh] pb-16 bg-dark-400 overflow-y-auto">
            <div className="w-[350px] mx-auto">
                <Image 
                    src="/crossbase-logo-white.svg" 
                    alt="crossbase.ai" 
                    width={0} 
                    height={0} 
                    className="h-auto w-auto mx-auto my-10" 
                />
                {children}
            </div>
            <footer className="absolute bottom-0 bg-dark-400 w-full py-5 border-t-2 border-dark-200 text-xs text-light-400 text-center">
                © 2023 Crossbase Inc.  All Rights Reserved
            </footer>
        </div>
    );
}
 
export default AuthenticationLayout;