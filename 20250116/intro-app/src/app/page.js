import Greetings from "@/component/Greetings";
import Counter from "@/component/Counter";

export default function Home() {
  return (
      <div>
        <h1>Project Intro</h1>
        <Greetings name="Ajrul" age="35" place="Malaysia"></Greetings>
        <Greetings name="Zainal" age="32" place="Canada"></Greetings>
        <Counter></Counter>
      </div>
  );
}