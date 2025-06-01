import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface IProps {
    text : string | undefined;
    children: React.ReactNode;
}

const CustomTooltip = ({ children, text }: IProps) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent className="bg-primary text-white font-medium">
                    {text}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default CustomTooltip;
