import cls from './ArrowIcon.module.css'

interface ArrowIconProps {
  color: string,
  direction?: string,
}

export const ArrowIcon = ({ color = 'white', direction = 'LEFT' }: ArrowIconProps) => (
  <svg className={cls[direction]} width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M4.03713 9.33717C2.12736 8.29582 1.17247 7.77514 0.760529 7.14917C0.101916 6.14836 0.101916 4.85164 0.760529 3.85083C1.17247 3.22486 2.12736 2.70418 4.03713 1.66282C5.8113 0.695417 6.69838 0.211713 7.4209 0.192658C8.5754 0.162209 9.64487 0.797182 10.1708 1.82536C10.5 2.46884 10.5 3.47922 10.5 5.5C10.5 7.52077 10.5 8.53116 10.1708 9.17464C9.64487 10.2028 8.5754 10.8378 7.4209 10.8073C6.69838 10.7883 5.8113 10.3046 4.03713 9.33717Z' fill={color} />
  </svg>
)
