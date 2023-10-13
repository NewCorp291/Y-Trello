import { Navbar } from "@/components/navbar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return ( 
    <div className="h-full">
      <Navbar />
      <main className="md:pl-20 pl-10 pt-20 h-full">
        {children}
      </main>
    </div>
  )
};

export default RootLayout;
