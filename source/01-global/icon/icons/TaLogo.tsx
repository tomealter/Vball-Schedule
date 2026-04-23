// organize-imports-ignore
// This component is automatically generated.
// SVGs should be added to icon/svgs.
// See the project documentation for more information.
// tslint:disable:ordered-imports
import clsx from 'clsx';
import type { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
  isHidden?: boolean;
  modifierClasses?: string | string[];
}
const SvgTaLogo = ({
  modifierClasses,
  isHidden,
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => {
  return (
    <svg
      role={title ? 'img' : undefined}
      aria-hidden={isHidden ? 'true' : 'false'}
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 834.7 476.1"
      xmlSpace="preserve"
      className={clsx('icon', modifierClasses)}
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <g>
        <path d="M418.6,3.1L368,132.6c-0.6,1.4-2,2.4-3.5,2.4h-83.6c-2.4,0-4.3,1.9-4.3,4.3v224.5c0,2-0.4,3.9-1.1,5.7 l-40.6,103.9c-0.6,1.6-2.2,2.7-3.9,2.7H119.5c-2.4,0-4.3-1.9-4.3-4.3V139.4c0-2.4-1.9-4.3-4.3-4.3H4.3c-2.4,0-4.3-1.9-4.3-4.3V4.4 C0,2,1.9,0.1,4.3,0.1h412.2C418.1,0,419.2,1.6,418.6,3.1z" />
        <path d="M832.2,476.1H666.9c-1.7,0-3.3-1.1-3.9-2.7L562,214.8c-0.4-1.2-2.1-1.2-2.5,0l-101,258.6 c-0.6,1.6-2.2,2.7-3.9,2.7H289.3c-1.7,0-2.8-1.7-2.2-3.3L470.9,2.3c0.5-1.4,1.9-2.3,3.4-2.3h173c1.5,0,2.9,0.9,3.4,2.3l183.8,470.5 C835.1,474.4,833.9,476.1,832.2,476.1z" />
      </g>
    </svg>
  );
};
export default SvgTaLogo;
