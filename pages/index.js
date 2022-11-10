import Head from "../components/Head";
import NavBar from "../components/NavBar";
import BuyForm from "../components/BuyForm";

export default function Home() {
  return (
    <div className="w-screen">
      <NavBar />
      <BuyForm />
    </div>
  );
}
