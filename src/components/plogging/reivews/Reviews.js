import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';
import axios from 'axios';
import { Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../../../styles/plogging/review/Reviews.css';
import { BiSearch } from "react-icons/bi"; <BiSearch size={30}/>

export default function ReviewList(){
    const [reviews,setReviews]=useState([]);
    const navigate = useNavigate();
    const [search,setSearch]=useState("");
    const [searchList, setSearchList]=useState([]);

      // 페이징 ---------------------------------------------------------------
      const [totPages, setTotPages] = useState(0); // 전체 페이지
      const [nowPage, setNowPage] = useState(1); // 현재 페이지
      const changePage = (no) => { // 페이지 클릭할 때마다 현재 페이지 변경
          setNowPage(no);
      };

      useEffect(()=>{
        setSearchList(null);
        setSearch(null);
        console.log(searchList);
      },[]);
    
    useEffect(() => {
        axios
        .get(`http://localhost:8080/reviews/${nowPage}`)
        .then((res)=>{
            console.log(res.data);
            setReviews(res.data.res.content);
            setTotPages(res.data.all);
        })
        .catch ((err)=> {
            console.log(err);
        });
    },[nowPage]);

    console.log(search);
        
    const handleSearch=()=>{
        console.log("검색");
        if(search===null || search===""){
            setSearchList(null);
            setSearch(null);
            console.log("검색어 없음");
            alert("검색어를 입력해주세요");
        }else{
            console.log("검색어 : "+search);
            try {
                const searchResult=reviews.filter(itemList=>itemList.title.includes(search));
                console.log(searchResult);
                searchResult
                if(searchResult!==null || searchResult.length>0){
                    console.log("검색할것이 잇댜");
                    const filterList=reviews.filter(itemList=>itemList.title.includes(search));
                    setSearchList(filterList);
                    console.log(searchList);
                }else{
                    alert("검색 결과가 없습니다");
                }
            } catch (error) {
                console.log(error);      
            }
        }
    };

    // const onChangeSearch=(e)=>{
    //   console.log("search input");
    //   setSearch(e.target.value);  
    // };

    const handleSort=(e, type)=>{
        console.log("리뷰 정렬");
        if(type === '조회순'){
            console.log("조회순");
            const sortByView = [...reviews].sort((a, b) => b.views - a.views);
            setReviews(sortByView);

        }else if(type === '최신순'){
            console.log("최신순");
            navigate("/reviews");
        }else{
            return ;
        }
    };
   
    return (
        <div className="reviews_mainLayout">
            <div className="review_wrap">
                <div className="reviews_top">
                    <div className="review_top_title">
                        <div className='review_top_title2'>
                            REVIEWS
                        </div>
                    </div>
                    <div className='sortAndSearch'>
                        <div className='sortAndSearchIn'>
                            <div className="review_sort">
                                <ul className="review_sort_ul">
                                    <li onClick={(e)=>handleSort(e,"최신순")}>
                                        최신순
                                    </li>
                                    <li onClick={(e)=>handleSort(e, "조회순")}>
                                        조회순
                                    </li>
                                </ul>
                            </div>
                            <div className="reivew_search">
                                <input className="search_input" name='search_input' type="text" placeholder="    search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
                                <BiSearch className="search_icon" onClick={handleSearch}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="listLayout">
                    {
                        searchList !== null && searchList.length>0?
                            searchList.map(review=>{
                            const createdAt=moment(review.createdAt);
                            const formattedDate=createdAt.format('YYYY-MM-DD');
                            return (
                                <div className="listItem"  key={review.id}>
                                    <div className='listItem_detail'>
                                        <div className='nickAndPic'>
                                            <div className="review_pic">{reviews.writerPic}</div>
                                            <div className="review_nickname">{review.writerNickname}</div>
                                        </div>
                                        <div className='review_detail'>
                                            <Link to={`/reviewInfo/${review.forumId}`}>
                                                <div className="review_title">{review.title}</div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="review_footer">
                                        <div className='dateAndView'>
                                            <div className="viewLayout">
                                                <div className='review_span'>조회수</div>
                                                <div className="review_views">{review.views}</div>
                                            </div>
                                            <div className="review_created_at">{formattedDate}</div>
                                        </div>
                                    </div>
                                </div>
                                )
                            })
                                : 
                            reviews.length !== 0 && reviews.map(review => {
                            const createdAt=moment(review.createdAt);
                            const formattedDate=createdAt.format('YYYY-MM-DD');
                            return (
                                <div className="listItem"  key={review.id}>
                                    <div className='listItem_detail'>
                                        <div className='nickAndPic'>
                                            <div className="review_pic">{reviews.writerPic}</div>
                                            <div className="review_nickname">{review.writerNickname}</div>
                                        </div>
                                        <div className='review_detail'>
                                            <Link to={`/reviewInfo/${review.forumId}`}>
                                                <div className="review_title">{review.title}</div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="review_footer">
                                        <div className='dateAndView'>
                                            <div className="viewLayout">
                                                <div className='review_span'>조회수</div>
                                                <div className="review_views">{review.views}</div>
                                            </div>
                                            <div className="review_created_at">{formattedDate}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='container_myBottom'>
                    <Pagination current={nowPage} onChange={changePage} pageSize={5} total={totPages} />
                </div>
            </div>
        </div>
    );
}