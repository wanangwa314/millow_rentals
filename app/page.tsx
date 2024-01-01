import Navbar from "@/components/Home/Navbar";
import Searchbar from "@/components/Home/Searchbar";

export default function Home() {
  return (
    <div className="bg-white">
      <Navbar />
      <div className="bg-slate-400 h-10 relative"> 
        <img 
            src={"https://i.ibb.co/4f99r5z/frames-for-your-heart-2d4l-AQAlb-DA-unsplash.jpg"}
            className="h-96 w-full object-cover" 	
            alt="Picture of the author"
          />

          <Searchbar className="absolute top-20 left-1/3"/>
      </div>

      <h2 className="text-center text-black">Get personalised home recommendations</h2>
    </div>
  );
}
