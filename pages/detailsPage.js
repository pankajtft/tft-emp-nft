import { EyeOutlined, HeartOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import MenuItem from "../components/CompactMenu";
import CountDown from "../components/CountDown";
import styles from "../styles/Details.module.css";
import { Card } from "antd";
export default function DetailsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "row", width:'100%' }}>
      <div
        hoverable
        style={{
          width: "30%",
          alignItems: "center",
        //   backgroundColor: "pink",
          // border: "1px solid black",
          margin: "5rem",
          padding: "1rem",
          justifyContent:'center',
          alignItems:'center',
          borderRadius: "1rem",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
        }}
        >
          <img
            onClick={() => console.log("Hello")}
            className={styles.image}
            style={{
              backgroundColor: `#${Math.floor(
                Math.random() * 16777215
              ).toString(16)}`,
            }}
            alt="example"
            src="https://joeschmoe.io/api/v1/random"
          />
       
      </div>
      <div
        style={{
            width: "50%",
            height:"50%",
            alignItems: "center",
            // border: "1px solid black",
            margin: "5rem",
            marginLeft:"-2rem",
            padding: "1rem",
            borderRadius: "1rem",
            justifyContent:'center',
            alignItems:'center',
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
          }}
      >
        <div className={styles.additional}>
          <p>
            <span className={styles.cardName}>John Doe</span>
          </p>
          <p className="price">
              
            <span className={styles.price}>Current Price: 20 Ethereum</span>
          </p>
          <CountDown/>
        </div>
        <div className={styles.btnContainer}>
        <button
          className={
            "AddtoCart bg-gray-800 hover:bg-gray-400 text-white font-bold my-1 py-5 px-0 rounded-2xl w-4/12 m-6"
          }
        >
          Add to Cart
        </button>
        <button
          className={
            "buyNow bg-gray-800 hover:bg-gray-400 text-white font-bold my-1 py-5 px-0 rounded-2xl w-4/12 m-6"
          }
        >
          Buy Now
        </button>
        </div>
      </div>
    </div>
    //    <div className={styles.container}>
    //       <div
    //       style={{
    //         width:"30%",
    //         height:"30rem",
    //         display: "flex",
    //         flexWrap: "wrap",
    //         justifyContent: "center",
    //         alignItems: "center",
    //         backgroundColor:`#${Math.floor(Math.random() * 16777215).toString(
    //             16
    //           )}`,
    //           borderRadius:"2rem"
    //       }} >
    //          <img
    //       onClick={()=>console.log("Hello")}
    //       className={styles.image}
    //       style={{
    //         backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
    //           16
    //         )}`,
    //       }}
    //       alt="example"
    //       src="https://joeschmoe.io/api/v1/random"
    //         />
    //       </div>
    //      <div style={{
    //          width:"60%",
    //          borderRadius:"2rem",
    //          alignItems:'center',
    //          justifyContent:'center',
    //          backgroundColor:'white',
    //          margin:"1rem"}}>
    //      <div style={{
    //          display:'flex',
    //          width:"100%",
    //          flexDirection:'row',
    //          justifyContent:'center',
    //          alignContent:'space-between'}}>
    //          <h1>Binod aka Kamlesh</h1>
    //          <span><MenuItem/></span>
    //          </div>
    //      </div>
    /* <div style={{ justifyContent:'center', alignItems:'space-around' ,display: "flex", flexDirection:'row'}}>
              <div >
              Binod aka Kamlesh
              
              </div>
              <Col gutter={16}>
              <MenuItem/>
              </Col>
          </div> */
    /* <Row >
              #9016
              Owned by : KamleshOP
          </Row>
          <Row>
                <Col>
                  <EyeOutlined/> views
                  <HeartOutlined /> favourites
                  </Col>
            </Row> */

    /*         
          <Row style={{margin:"1rem",
            display: "flex",
            flex:1,
            flexDirection: "column",
            width:'100%',
            justifyContent: "center"
            }}>
              
             <CountDown/>
             
          </Row> */

    // </div>
  );
}
