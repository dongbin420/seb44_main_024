import { BsSearch } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CategoryModal from './CategoryModal';

// interface HeaderProps {
//   search: string;
// }
// const Header: React.FC<HeaderProps> = ({ search }) => {

const Header = () => {
  // 검색인풋 제출
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [isCategoryOpen, setisCategoryOpen] = useState(false);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const handleSearchInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchInput.length > 1) {
      navigate(`/search?keyword=${searchInput}`);
    } else {
      alert('검색어는 최소 두 글자 이상 입력해주세요.');
    }
  };
  // const [IsLogin, setIsLogin] = useState(false);

  // const IsLogined = () => {
  //   //if got token setIsLogin(true)
  // };

  const OpenCategoryModal = () => {
    setisCategoryOpen(!isCategoryOpen);
  };

  const CloseCategoryModal = () => {
    setisCategoryOpen(false);
  };

  return (
    <div className="flex items-center justify-between bg-mainyellow px-10 py-6 text-mainblack ">
      <div className="flex flex-row">
        <div className="mr-16 cursor-pointer text-4xl font-bold hover:bg-maingray">
          <Link to="/">MovieLog</Link>
        </div>
        <div className="flex flex-col">
          <button
            onClick={OpenCategoryModal}
            className="mt-2 cursor-pointer text-2xl font-bold  hover:bg-maingray "
          >
            Categories
          </button>
          {isCategoryOpen && (
            <CategoryModal
              // onClick={handleBackdropClick}
              onClose={CloseCategoryModal}
              genre={'string'}
              tag={'string'}
            ></CategoryModal>
          )}
        </div>
      </div>

      <div className="flex items-center">
        <form onSubmit={handleSearchInputSubmit} className="mr-6 flex items-center">
          <input
            onChange={handleSearchInputChange}
            type="text"
            placeholder="검색"
            className="w-32 border-b-2 border-maindarkgray bg-mainyellow px-4 py-2" //focus:outline-none
          />
          <button
            type="submit"
            className="mt-2 border-b-2 border-maindarkgray px-4 py-2 text-mainblack hover:bg-maingray"
          >
            <BsSearch />
          </button>
        </form>
        <div className="mr-4 mt-2 cursor-pointer font-bold text-mainblack hover:bg-maingray">
          <Link to="/login">Login</Link>
        </div>
        <div className="mt-2 cursor-pointer font-bold text-mainblack hover:bg-maingray">
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};
export default Header;

/*토큰 구현이 끝난다면
상태에 따라 바뀌게끔 삼항자 설정
{setIsLogin(false) ? 
        <div className="mr-4 mt-2 cursor-pointer font-bold text-mainblack hover:bg-maingray">
          <Link to="/login">Login</Link>
        </div>
        <div className="mt-2 cursor-pointer font-bold text-mainblack hover:bg-maingray">
          <Link to="/signup">Sign Up</Link> :
<div className="mr-4 mt-2 cursor-pointer font-bold text-mainblack hover:bg-maingray">
          <Link to="/mypage">MyPage</Link>
        </div>
        <div className="mt-2 cursor-pointer font-bold text-mainblack hover:bg-maingray">
          <Link to="/signup">Log Out</Link>
        </div>
        }

*/
