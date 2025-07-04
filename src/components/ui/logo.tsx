import React from 'react';

interface DaherLogoProps {
  w?: string;
  h?: string;
  className?: string;
}

function DaherLogo({ w = '32px', h = '32px', className = 'fill-secondary-500' }: DaherLogoProps) {
  return (
    <div style={{ width: w, height: h }}>
      <svg viewBox="0 0 32 32" className={className} xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_i_1_18)">
          <rect width="32" height="32" rx="16" />
        </g>
        <rect
          x="0.375"
          y="0.375"
          width="31.25"
          height="31.25"
          rx="15.625"
          strokeWidth="0.75"
          className='stroke-foreground'
        />
        <g filter="url(#filter1_d_1_18)">
          <circle cx="15" cy="16" r="2"           className='fill-foreground' />
          <rect x="10" y="5" width="2" height="22"           className='fill-foreground' />
          <path
            d="M15.5 12C20.5 13 20.5 19 15.5 20"
                      className='stroke-foreground'

            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <path
            d="M16 9C24 10.75 24 21.25 16 23"
                      className='stroke-foreground'
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <path
            d="M16.5 6.5C27.5 9 27.5 23 16.5 25.5"
                      className='stroke-foreground'
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </g>
        <defs>
          <filter
            id="filter0_i_1_18"
            x="0"
            y="0"
            width="32"
            height="32"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
            />
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1_18" />
          </filter>
          <filter
            id="filter1_d_1_18"
            x="8"
            y="3"
            width="19.4"
            height="26"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="1" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.239216 0 0 0 0 0.145098 0 0 0 0 0 0 0 0 0.5 0"
            />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_18" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_18" result="shape" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export default DaherLogo;
