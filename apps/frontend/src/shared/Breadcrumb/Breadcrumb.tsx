import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Home } from 'lucide-react';
import { Link } from 'react-router';

interface BreadcrumbComponentProps {
  items: {
    label: string;
    href: string;
  }[];
}

const BreadcrumbComponent = ({ items }: BreadcrumbComponentProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link to="/">
            <Home
              aria-hidden
              data-icon="inline-start"
              className="size-4 ml-2"
            />
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {items.map((item, index) => (
          <>
            <BreadcrumbItem key={item.href}>
              <Link to={item.href}>{item.label}</Link>
            </BreadcrumbItem>
            {index !== items.length - 1 && <BreadcrumbSeparator />}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
