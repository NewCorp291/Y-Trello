import { Navbar } from "@/components/navbar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return ( 
    <div className="h-full">
      <Navbar />
      <main className="container mx-auto pt-32 h-full flex min-h-screen flex-col items-center justify-between overflow-auto">
        {children}
      </main>
    </div>
  )
};

export default RootLayout;
