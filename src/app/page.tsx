// Static Imports
import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to /products when visiting /
  redirect('/Products');
}