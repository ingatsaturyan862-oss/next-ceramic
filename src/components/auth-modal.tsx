import React from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { FormRegister } from "./form/form-register";
import { FormLogin } from "./form/form-login";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const AuthModal: React.FC<Props> = (props) => {
  const { className, children } = props;
  const [toggle, setToggle] = React.useState(false);
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className={cn("z-105", className)}>
        <DialogTitle hidden />
        {!toggle ? <FormRegister /> : <FormLogin />}
        <div className="flex">
          <Button
            onClick={() =>
              signIn.social({
                provider: "google",
                callbackURL: "/",
                fetchOptions: {
                  onSuccess() {
                    toast.success("Successfuly signin google");
                  },
                  onError(error) {
                    console.log(error);
                    toast.error("failed signin");
                  },
                },
              })
            }
            className="grow"
          >
            Google
          </Button>

          <Button
            onClick={() =>
              signIn.social({
                provider: "github",
                callbackURL: "/",
                fetchOptions: {
                  onSuccess() {
                    toast.success("Successfuly signin github");
                    toast.success("Successfully signin GitHub");
                  },
                  onError(error) {
                    console.log(error);
                    toast.error("failed signin");
                  },
                },
              })
            }
            className="grow"
          >
            Github
          </Button>
        </div>
        <Button
          variant={"outline"}
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          {toggle ? "signup" : "signin"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
