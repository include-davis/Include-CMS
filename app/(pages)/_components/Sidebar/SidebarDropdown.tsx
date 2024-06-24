import styles from './SidebarDropdown.module.scss';

interface SidebarDropdownProps {
  links: {
    name: string;
    url: string;
  };
}

export default function SidebarDropdown({ links }: SidebarDropdownProps) {}
