import React, { useEffect,useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News=(props)=>  {
  const [articles,setArticles] = useState([])
  const [loading,setLoading] = useState(true)
  const [page,setPage] = useState(1)
  const [totalResults,setTotalResults] = useState(0)
 

   const capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



 const updateNews= async ()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(60);
    // console.log(parseData);
    setArticles(parseData.articles)
    setTotalResults(parseData.totalResults)
    setLoading(false)

    props.setProgress(100);
  }
useEffect(()=>{
    document.title= `${capitalizeFirstLetter(props.category)} - NewsPedia`;
  updateNews();
},[])

  // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=7dc16a11fb314dbaa12fb074a8a27370&page=1&pagesize=${props.pageSize}`;
  // this.setState({loading:true});
  // let data = await fetch(url);
  // let parseData = await data.json();
  // // console.log(parseData);
  // this.setState({
  //   articles:parseData.articles,
  //   totalResults:parseData.totalResults,
  //   loading:false
  // })
  



// const handlePreviousClick=async()=>{
// console.log("Previous")

// let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=7dc16a11fb314dbaa12fb074a8a27370&page=${this.state.page - 1}&pagesize=${props.pageSize}`;
// this.setState({loading:true})
//   let data = await fetch(url);
//   let parseData = await data.json();
//   console.log(parseData);
  // articles:parseData.articles,
  // loading:false
  //  setPage(page-1)
  //  updateNews();
// }
// const handleNextClick=async()=>{
// console.log("Next");
// if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize))){
// let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=7dc16a11fb314dbaa12fb074a8a27370&page=${this.state.page + 1}&pagesize=${props.pageSize}`;
// this.setState({loading:true})
//   let data = await fetch(url);
//   let parseData = await data.json();
  // articles:parseData.articles,
  // loading:false
  //  setPage(page+1)
  //  updateNews();
  // }

  const fetchMoreData = async() => {
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page+1}&pagesize=${props.pageSize}`;
  setPage(page+1)
    let data = await fetch(url);
    let parseData = await data.json();
    // console.log(parseData);
    setArticles(articles.concat(parseData.articles))
    setTotalResults(parseData.totalResults)
  };


  
    return (
      <>
        <h1 className="text-center" style={{margin: "35px 0",marginTop:"90px"}}>NewsPedia - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
       { loading && <Spinner/>}
       <InfiniteScroll
    dataLength={articles.length}
    next={fetchMoreData}
    hasMore={articles.length !==totalResults}
    loader={<Spinner/>}
  >
    <div className="container">
        <div className="row ">
        { articles.map((element)=>{
        return <div className="col-md-4 " key={element.url} >
        <Newsitem title={element.title?element.title.slice(0,46):""} description={element.description?element.description.slice(0,120):""} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
        </div>
        })}
        
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between my-5">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark"onClick={this.handleNextClick}>Next &rarr;</button>

        </div> */}
      </>
    )
  
}
News.defaultProps = {
  country: 'in',
  pageSize:10,
  category:"general"
}
News.propTypes = {
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string,
}


export default News
