import { Car } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <Car className="h-8 w-8" />
          <div>
            <h1 className="text-2xl font-bold">PT XYZ</h1>
            <p className="text-blue-100">Sistem Manajemen Kendaraan Bekas</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
