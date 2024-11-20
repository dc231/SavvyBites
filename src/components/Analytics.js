import React from "react";
import { Progress } from "antd";
//category
const categories=[
    "breakfast",
    "lunch",
    "snacks",
    "dinner",
    "food", 
    "fruits",
    "cleaniness",
    "utility",
];

// const AnalyticsCategory = ({ allTransection ,category}) => {
   
// }
const Analytics = ({ allTransection }) => {

  //total turnover
  const totalTurnover = allTransection.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );


  const totalBreakfastTurnover = allTransection
    .filter((transaction) => transaction.category === "breakfast")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalLunchTurnover = allTransection
    .filter((transaction) => transaction.category === "lunch")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalSnacksTurnover = allTransection
    .filter((transaction) => transaction.category === "snacks")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalDinnerTurnover = allTransection
    .filter((transaction) => transaction.category === "dinner")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalFoodTurnover = allTransection
    .filter((transaction) => transaction.category === "food")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalFruitsTurnover = allTransection
    .filter((transaction) => transaction.category === "fruits")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalCleaninessTurnover = allTransection
    .filter((transaction) => transaction.category === "cleaniness")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalUtilityTurnover = allTransection
    .filter((transaction) => transaction.category === "utility")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  

  const totalBreakfastTurnoverPercent =
    (totalBreakfastTurnover / totalTurnover) * 100;
    const totalLunchTurnoverPercent =
    (totalLunchTurnover / totalTurnover) * 100;
    const totalSnacksTurnoverPercent =
    (totalSnacksTurnover / totalTurnover) * 100;
    const totalDinnerTurnoverPercent =
    (totalDinnerTurnover / totalTurnover) * 100;
    const totalFoodTurnoverPercent =
    (totalFoodTurnover / totalTurnover) * 100;
    const totalFruitsTurnoverPercent =
    (totalFruitsTurnover / totalTurnover) * 100;
    const totalCleaninessTurnoverPercent =
    (totalCleaninessTurnover / totalTurnover) * 100;
    const totalUtilityTurnoverPercent =
    (totalUtilityTurnover / totalTurnover) * 100;
  
  return (
    <>
   <div className="d-flex inline-flex bg-white .bg-secondary.bg-gradient ">
      <div className="row m-4 ">
        <div className="col-md-5 my-3 d-inline">
          <div className="card">
            <div className="card-header">
            Total TurnOver : {totalTurnover}
            </div>
            <div className="card-body flex -mx-3">
             
             <div className="flex flex-col my-3 mx-3">
              <h5 className="text-success my-3">
                Breakfast: {totalBreakfastTurnover}
              </h5>
              <Progress
                  type="circle"
                  strokeColor={"yellow"}
                  className="mx-2"
                  percent={totalBreakfastTurnoverPercent.toFixed(0)}
                />
                </div>

                <div className="flex flex-col my-3 mx-3">
                <h5 className="text-success my-3">
                Lunch : {totalLunchTurnover}
              </h5>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalLunchTurnoverPercent.toFixed(0)}
                />
                </div>

                <div className="flex flex-col my-3 mx-3">
                <h5 className="text-success my-3">
                Snacks : {totalSnacksTurnover}
              </h5>
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalSnacksTurnoverPercent.toFixed(0)}
                />
                </div>
                
                <div className="flex flex-col my-3 mx-3">
                <h5 className="text-danger my-3">
                Dinner : {totalDinnerTurnover}
              </h5>
                <Progress
                  type="circle"
                  strokeColor={"orange"}
                  className="mx-2"
                  percent={totalDinnerTurnoverPercent.toFixed(0)}
                />
                </div>
            </div>
          </div>
        </div>
        <div className="col-md-5 my-3 ">
          <div className="card">
            {/* <div className="card-header">Total TurnOver : {totalTurnover}</div> */}
            <div className="card-body flex -mx-3">
              <div className="flex flex-col my-3 mx-3">
                <h5 className="text-danger my-3">
                Food : {totalFoodTurnover}
                </h5>
                <Progress
                  type="circle"
                  strokeColor={"orange"}
                  className="mx-2"
                  percent={totalFoodTurnoverPercent.toFixed(0)}
                />
                </div>

                <div className="flex flex-col my-3 mx-3">
                <h5 className="text-danger my-3">
                Fruits : {totalFruitsTurnover}
                </h5>
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalFruitsTurnoverPercent.toFixed(0)}
                />
                </div>

                <div className="flex flex-col my-3 mx-3">
                <h5 className="text-danger my-3">
                Cleaniness : {totalCleaninessTurnover}
                </h5>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalCleaninessTurnoverPercent.toFixed(0)}
                />
                </div>

                <div className="flex flex-col my-3 mx-3">
                <h5 className="text-danger my-3">
                Utility : {totalUtilityTurnover}
                </h5>
                <Progress
                  type="circle"
                  strokeColor={"yellow"}
                  className="mx-2"
                  percent={totalUtilityTurnoverPercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
       <div className=" row m-8 ">
       <div className="col-md-5 my-3 ml-8 d-inline ">
            <h4>Categorywise Expanse</h4>
            {categories.map((category,index)=>{
               
              const amount=allTransection
              .filter(
                (transaction)=>
                transaction.category === category
              )
              .reduce((acc,transaction)=>acc+transaction.amount,0);
              return(
                amount >0 && (
                  <li key={category.id}> 
                <div className="card">
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                     percent={((amount/totalTurnover)*100).toFixed(0)}/>
                  </div>
                 </div>
                 </li>
              ));
              
                }
            )}
            
        </div>
      </div>
      </div>
    </>
  );
};

export default Analytics;
