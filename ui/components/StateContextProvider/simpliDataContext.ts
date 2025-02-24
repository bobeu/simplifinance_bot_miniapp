import { Path, VoidFunc } from "@/interfaces";

export interface DataContextProps {
    exitOnboardScreen: VoidFunc;
    message: string;
    setmessage: (arg: string) => void;
    toggleDisplayOnboardUser: VoidFunc;
    displayOnboardUser: boolean;
    displayAppScreen: boolean;
    activePath: Path;
    setActivepath: (arg: Path) => void;
}
