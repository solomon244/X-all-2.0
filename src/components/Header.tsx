import { useRouter } from 'next/router';
import Logo from './Logo';
import DMInbox from './DMInbox';

const Header = () => {
  const router = useRouter();

  return (
    <div className="w-full">
      <div className="flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
        <div className="cursor-pointer" onClick={() => router.push("/")}>
          <Logo />
        </div>
        <div>
          <DMInbox />
        </div>
      </div>
    </div>
  );
};

export default Header;