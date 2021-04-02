import { Box } from '@chakra-ui/react'

const Icon = ({ color, direction = 'down', ...props }) => {
  return (
    <Box transform={`rotate(${direction === 'down' ? '180' : 0}deg)`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="35"
        viewBox="0 0 35 35"
        {...props}
      >
        <path
          fill={color}
          d="M35 17.5A17.5 17.5 0 1117.5 0 17.5 17.5 0 0135 17.5zM14.4 9.315V17.5h-5a.847.847 0 00-.6 1.447l8.108 8.066a.839.839 0 001.193 0l8.107-8.067a.847.847 0 00-.6-1.447h-5V9.314a.849.849 0 00-.847-.847h-4.516a.849.849 0 00-.849.847z"
        />
      </svg>
    </Box>
  )
}

export default Icon
