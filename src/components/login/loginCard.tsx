import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { NumberPart } from "./numberPart";
import { PasswordPart } from "./passwordPart";
export const LoginCard = () => {
  return (
    <div>
      <Card className="w-[488px] shadow-none p-6">
        <CardHeader className="rtl mb-5 ">
          <div style={{ display: "flex", gap: "8px" }}>
            <img src="./Group.png" alt="Group" />
            <img src="./abr.png" alt="ABR" />
          </div>
        </CardHeader>
        <CardContent>
          {/* <NumberPart /> */}
          <PasswordPart />
        </CardContent>
      </Card>
    </div>
  );
};
