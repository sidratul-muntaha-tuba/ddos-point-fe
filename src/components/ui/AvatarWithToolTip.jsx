import React from "react";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "../../ui-components/ui/avatar";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../../ui-components/ui/tooltip";
const AvatarWithToolTip = ({
	avatarImageLink,
	avatarFallbackText,
	tooltipText,
}) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Avatar>
						<AvatarImage src={avatarImageLink} />
						<AvatarFallback>{avatarFallbackText}</AvatarFallback>
					</Avatar>
				</TooltipTrigger>
				<TooltipContent>
					<p>{tooltipText}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default AvatarWithToolTip;
