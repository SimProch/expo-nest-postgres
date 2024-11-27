import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function IconEye({
  color,
  width = 24,
  height = 24,
  ...otherProps
}: React.ComponentProps<typeof Svg>) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" {...otherProps}>
      <Path
        fill={color}
        d="M12 5.991A9.682 9.682 0 0120.928 12a9.637 9.637 0 01-17.856 0A9.682 9.682 0 0112 5.991m0-1A10.648 10.648 0 002 12a10.638 10.638 0 0020 0 10.648 10.648 0 00-10-7.009z"
      />
      <Path
        fill={color}
        d="M12 16a4 4 0 114-4 4 4 0 01-4 4zm0-7a3 3 0 103 3 3 3 0 00-3-3z"
      />
    </Svg>
  );
}
