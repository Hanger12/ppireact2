import '../App.css';
import logo from '../VAyR.gif';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCircleUp, faCircleDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

function News() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [isFiltered, setFilter] = useState(null);
    const [textFilter, setTextFilter] = useState("");
    const [sort, setSort] = useState("");
    const [pageCount, setPageCount] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageArray, setPageArray] = useState([]);
    const [isOnSwitch,setOnSwitch]= useState(false)
    
    function countPages(count){
        setPageCount(Math.ceil(count/5));
        getPageArray(Math.ceil(count/5));
    }

    function getPageArray(num){
        if(num < 6){
            let temp=[];
            for (let i=0;i<=num-3;i++){
                temp[i]=i+2;
            }
            setPageArray(temp);
        }
        else if(pageNumber + 2 >=num){
            setPageArray([num-5,num-4,num-3,num-2,num-1]);
        }
        else if(pageNumber -2 <=1){
            setPageArray([2,3,4,5,6]);
        }
        else{
            setPageArray([pageNumber-2,pageNumber-1,pageNumber,pageNumber+1,pageNumber+2]);
        }
    }

    useEffect(() =>{
        fetchForPages();
        isFiltered ? fetchWithFilter() : fetchIt();
    }, [textFilter,sort,pageNumber])

    function fetchIt(){
        {
            fetch("https://api.spaceflightnewsapi.net/v3/articles?_limit=5&_start="+(((pageNumber-1)*5)))
                .then(res => res.json())
                .then(
                    (result) => {
                        setItems(result);
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }
    }

    function fetchForPages(){
        {
            fetch("https://api.spaceflightnewsapi.net/v3/articles/count?"+textFilter)
                .then(res => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true);
                        countPages(result)
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }
    }

    function fetchWithFilter(){
        {
            setIsLoaded(false);
            fetch("https://api.spaceflightnewsapi.net/v3/articles?_limit=5&_start="+(((pageNumber-1)*5))+"&"+textFilter+"&"+sort)
                .then(res => res.json())
                .then(
                    (result) => {
                        setItems(result);
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }
    }
    function handleOnClickSearch(value){
        setFilter(true);
        setTextFilter(value);
    }

    function handleOnClickSort(value){
        setFilter(true);
        setSort(value);

    }

    function handlePageClick(value){
        setPageNumber(value);
        getPageArray(pageCount);
        document.getElementById("pageNum").textContent = value;
    }


    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div className="loader"><img src={logo} alt="logo" /></div>;
    } else {
        return (
            <div>
                <div className={document.getElementById('react-switch-new').checked===false?"newsDiv":"newsDivDark"}>
                    <p className={document.getElementById('react-switch-new').checked===false?"example":"exampleDark"}>
                        <input  id="searchInputTitle" type="text" placeholder="Поиск по заголовку:"/>
                        <button onClick={()=>handleOnClickSearch("title_contains="+document.getElementById('searchInputTitle').value)}>
                            <FontAwesomeIcon icon={faSearch}/>
                        </button>
                    </p>
                    <p className={document.getElementById('react-switch-new').checked===false?"example":"exampleDark"}>
                        <input  id="searchInputSummary" type="text" placeholder="Поиск по содержанию:"/>
                        <button onClick={()=>handleOnClickSearch("summary_contains="+document.getElementById('searchInputSummary').value)}>
                            <FontAwesomeIcon icon={faSearch}/>
                        </button>
                    </p>
                    <br/>
                    <button className={document.getElementById('react-switch-new').checked===false?"buttonSort":"buttonSortDark"} onClick={()=>handleOnClickSort("_sort=publishedAt:desc")}><FontAwesomeIcon icon={faCircleUp}/>Сначала новые</button>
                    <button className={document.getElementById('react-switch-new').checked===false?"buttonSort":"buttonSortDark"} onClick={()=>handleOnClickSort("_sort=publishedAt:asc")}><FontAwesomeIcon icon={faCircleDown}/>Сначала старые</button>
                </div>
                <div className={document.getElementById('react-switch-new').checked===false?"newsDiv":"newsDivDark"}>
                    {
                        items.length && pageCount!==1 ?
                            <button className={document.getElementById('react-switch-new').checked===false?"pageBarBtn":"pageBarBtnDark"} onClick={()=>handlePageClick(1)}>1</button>
                            : ""
                    }
                    {
                        pageArray.map(page => (
                            <button className={document.getElementById('react-switch-new').checked===false?"pageBarBtn":"pageBarBtnDark"} onClick={(e)=>handlePageClick(page)}>{page.toString()}</button>
                        ))
                    }
                    {
                        items.length && pageCount!==1 ?
                            <button className={document.getElementById('react-switch-new').checked===false?"pageBarBtn":"pageBarBtnDark"} onClick={()=>handlePageClick(pageCount)}>{pageCount}</button>
                            : ""
                    }
                </div>
                { items.length&&<div className={document.getElementById('react-switch-new').checked===false?"newsDiv":"newsDivDark"}>
                    <p className={document.getElementById('react-switch-new').checked===false?"text":"textDark"}>Текущая страница: <p className="pagesNum" id="pageNum">1</p></p>
                </div>}
                <hr/>
                { items.length && <ul className="pageList">
                    {items.map(item => (
                        <li key={item.id}>
                            <p className={document.getElementById('react-switch-new').checked===false?"newsTitle":"newsTitleDark"} id="newsTitle">
                                <Link className={document.getElementById('react-switch-new').checked===false?"newTitleLink":"newTitleLinkDark"} id="headerNews" to={"/news/"+item.id}>{item.title}</Link>
                            </p>
                            <p><img className="ImageNews" src={item.imageUrl}/></p>
                            <p className={document.getElementById('react-switch-new').checked===false?"ColorPublish":"ColorPublishDark"}>Дата публикации: {item.publishedAt}</p>
                            <hr/>
                        </li>
                    ))}
                </ul> }
                { !items.length && isLoaded && <span className={document.getElementById('react-switch-new').checked===false?"text":"textDark"}>По вашему запросу новостей нет</span> }
                <hr className="hrSplit"/>
            </div>
        );
    }
}

export default News;