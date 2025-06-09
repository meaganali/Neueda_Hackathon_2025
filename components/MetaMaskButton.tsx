import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useMetaMask } from '@/hooks/useMetaMask';
import { toast } from 'sonner';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function MetaMaskButton() {
  const { isConnected, connect, disconnect, account, isInstalled, isLoading, error } = useMetaMask();
  const [isHovering, setIsHovering] = useState(false);
  
  // Format address to display only the first 6 and last 4 characters
  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  // Handle connect button click
  const handleConnect = async () => {
    if (!isInstalled) {
      toast.error('MetaMask not detected. Please install MetaMask extension.', {
        description: 'Visit metamask.io to install the browser extension.',
        action: {
          label: 'Visit site',
          onClick: () => window.open('https://metamask.io', '_blank')
        },
      });
      return;
    }
    
    try {
      await connect();
      toast.success('Wallet connected successfully!');
    } catch (err: any) {
      toast.error('Failed to connect wallet', {
        description: err.message || 'Please try again.',
      });
    }
  };
  
  // Handle disconnect button click
  const handleDisconnect = () => {
    disconnect();
    toast.success('Wallet disconnected successfully.');
  };
  
  if (!isConnected) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              onClick={handleConnect}
              disabled={isLoading}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 212 189"
                fill="none"
              >
                <path
                  d="M195.538 0H16.462C7.37 0 0 7.37 0 16.462V172.538C0 181.63 7.37 189 16.462 189H195.538C204.63 189 212 181.63 212 172.538V16.462C212 7.37 204.63 0 195.538 0Z"
                  fill="#FFE6D5"
                />
                <path
                  d="M168.428 20H44.0708C41.2889 20 39 22.2889 39 25.0708V105.274C39 108.056 41.2889 110.345 44.0708 110.345H68.0925V135.386C68.0925 136.175 69.0297 136.571 69.5891 136.04L98.8137 110.345H168.428C171.21 110.345 173.499 108.056 173.499 105.274V25.0708C173.499 22.2889 171.21 20 168.428 20Z"
                  fill="#FF9E30"
                />
                <path
                  d="M55.0393 71.7539H58.9567L67.3275 91.3321L75.6983 71.7539H79.6157L67.3275 100.945L55.0393 71.7539Z"
                  fill="white"
                />
                <path
                  d="M79.9943 71.7539H83.9117L92.2825 91.3321L100.653 71.7539H104.571L92.2825 100.945L79.9943 71.7539Z"
                  fill="white"
                />
                <path
                  d="M112.939 87.9321H121.333V91.7863H112.939V99.4369H108.548V91.7863H100.176V87.9321H108.548V80.3181H112.939V87.9321Z"
                  fill="white"
                />
                <path
                  d="M121.579 61.6844V42.1075L142.821 31.3613V51.0193L121.579 61.6844Z"
                  fill="white"
                />
                <path
                  d="M121.579 61.7909L142.821 72.4705V92.1285L121.579 81.3822V61.7909Z"
                  fill="white"
                />
                <path
                  d="M100.189 61.6868L121.431 51.0216V70.6741L100.189 61.7028V61.6868Z"
                  fill="white"
                />
                <path
                  d="M142.868 31.3613L164.11 41.9844V61.6843L142.868 51.0193V31.3613Z"
                  fill="white"
                />
                <path
                  d="M142.868 72.4659L164.11 61.7944V82.0832L142.868 92.1239V72.4659Z"
                  fill="white"
                />
                <path
                  d="M164.11 61.7944L185.374 72.4596V92.1239L164.11 81.4588V61.7944Z"
                  fill="white"
                />
                <path
                  d="M108.764 145V121.469H114.682V129.602H122.812V121.469H128.73V145H122.812V134.77H114.682V145H108.764Z"
                  fill="#EE811F"
                />
                <path
                  d="M148.197 136.926H155.16C154.927 142.486 149.918 146.125 143.754 146.125C136.579 146.125 131.7 141.945 131.7 133.453C131.7 125.172 136.742 120.723 143.754 120.723C150.883 120.723 154.938 124.996 155.16 130.637H148.197C147.85 128.129 146.329 126.316 143.754 126.316C140.723 126.316 138.721 129.137 138.721 133.453C138.721 137.828 140.782 140.531 143.754 140.531C146.329 140.531 147.821 139.055 148.197 136.926Z"
                  fill="#EE811F"
                />
              </svg>
              {isHovering ? "Connect Wallet" : "Connect"}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Connect MetaMask wallet</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 212 189"
            fill="none"
          >
            {/* MetaMask SVG icon (same as above) */}
            <path
              d="M195.538 0H16.462C7.37 0 0 7.37 0 16.462V172.538C0 181.63 7.37 189 16.462 189H195.538C204.63 189 212 181.63 212 172.538V16.462C212 7.37 204.63 0 195.538 0Z"
              fill="#FFE6D5"
            />
            <path
              d="M168.428 20H44.0708C41.2889 20 39 22.2889 39 25.0708V105.274C39 108.056 41.2889 110.345 44.0708 110.345H68.0925V135.386C68.0925 136.175 69.0297 136.571 69.5891 136.04L98.8137 110.345H168.428C171.21 110.345 173.499 108.056 173.499 105.274V25.0708C173.499 22.2889 171.21 20 168.428 20Z"
              fill="#FF9E30"
            />
            {/* Rest of the SVG paths omitted for brevity */}
          </svg>
          {formatAddress(account || '')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="text-xs" disabled>
          {account}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(account || '')}>
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDisconnect}>
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 