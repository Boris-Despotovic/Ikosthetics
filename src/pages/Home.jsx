import { IME_APLIKACIJE } from "../constants";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Home(){


    return(
        <>
        <h1>Welcome to {IME_APLIKACIJE}</h1>
        <div>
            Join fitness programs by Boris Despotović, Ikosthetics.
        </div>
        <div>
            Your body, your temple.
        </div>
        <div>
            “No man has the right to be an amateur in the matter of physical training. It is a shame for a man to grow old without seeing the beauty and strength of which his body is capable.”
― Socrates
    
    <DotLottieReact
      src="/Weightliftingcompetition.lottie"
      loop
      autoplay
    />
        </div>
        </>
    );
}
