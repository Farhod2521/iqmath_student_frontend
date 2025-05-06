// pages/index.tsx yoki kerakli joyda
import dynamic from "next/dynamic";

const MathKeyboard = dynamic(() => import("@/components/test-calc/index"), {
  ssr: false, // SSR o‘chirilgan
});

export default function Index() {
  return (
    <div className="p-4">
      <MathKeyboard />
    </div>
  );
}
