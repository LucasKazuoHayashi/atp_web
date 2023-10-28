import { useRouter } from "next/navigation";

export default function ButtonExit() {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.replace("login")}>Sair</button>
    </div>
  );
}
