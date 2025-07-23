const Header = () => (
  <div className="text-center mb-4 sm:mb-8">
    <div className="flex flex-col items-center">
      <img
        src="https://img.freepik.com/free-vector/beautiful-sitar-classical-music-instrument_96037-395.jpg?semt=ais_hybrid&w=740"
        alt="Sitar"
        className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-2 rounded-xl shadow"
        style={{ background: "#f7e9c2" }}
      />
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-yellow-900 mb-1 tracking-wide drop-shadow-lg">
        <span className="font-extrabold">सुर</span>
      </h1>
    </div>
    <p className="text-lg sm:text-xl md:text-2xl text-yellow-800 mb-2 font-serif">A Smart Way to See Sound</p>
    <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-yellow-900 via-yellow-600 to-yellow-400 mx-auto rounded-full"></div>
  </div>
);

export default Header;