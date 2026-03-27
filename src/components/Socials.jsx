import { FaFacebook } from "react-icons/fa";

export default function SocialBar() {
  return (
<div className="socials">
  <a href="https://instagram.com/ikosthetics" target="_blank">
    <i className="fab fa-instagram"></i>
  </a>
  <a href="https://facebook.com/ikosthetics" target="_blank">
    <FaFacebook size={35} />
  </a>
  <a href="https://youtube.com/watch?v=2xKn7y8OtQg" target="_blank">
    <i className="fab fa-youtube"></i>
  </a>
</div>
  );
}