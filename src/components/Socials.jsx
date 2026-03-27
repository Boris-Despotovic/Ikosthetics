import { FaFacebook, FaInstagram } from "react-icons/fa";
import { TfiYoutube } from "react-icons/tfi";

export default function SocialBar() {
  return (
<div className="socials">
  <a href="https://instagram.com/ikosthetics" target="_blank">
    <FaInstagram size={35} />
  </a>
  <a href="https://facebook.com/ikosthetics" target="_blank">
    <FaFacebook size={35} />
  </a>
  <a href="https://youtube.com/watch?v=2xKn7y8OtQg" target="_blank">
    <TfiYoutube size={35} />
  </a>
</div>
  );
}