import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import './App.css';
import TableWrapper from './components/TableWrapper/TableWrapper';
import ErrorInfo from './components/ErrorInfo/ErrorInfo';

const API_URL = 'https://recruitmentdb-508d.restdb.io/rest/';
const API_KEY = '5d9f48133cbe87164d4bb12c';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state={
      tableData: [],
      isLoading: true,
      error: false
    }
  }

  getDataFromApi(url) {
    return fetch(url, {
      method: "GET",  
      headers: { 
        'x-apikey': API_KEY, 
        'Content-Type':  'application/json' 
      }
    })
  }

  componentDidMount() {
    Promise.all([this.getDataFromApi(API_URL + "accounts"), this.getDataFromApi(API_URL + "accounttypes")])
      .then((resArray) => Promise.all(resArray.map(res => res.json())))
      .then(([accountList, accountTypes]) => {
        this.makeData(accountList, accountTypes);
      })
      .catch(err => {
        this.setState(() => { return { isLoading: false, error: err.message } })
      })
  }

  makeData = (accountList, accountTypes) => {
    let tableData = accountList.map(account => {
      return {
        name: account.name,
        profitLoss: `${account.currency}  ${account.profitLoss}`,
        accountType: accountTypes.find(acc => acc.id === account.accountType).title
      }
    })
    this.setState(() => {return { tableData: tableData, isLoading: false } });
  }

  render() {
    if(this.state.error) {
      return <ErrorInfo
        message={this.state.error}/>
    }
    return (
      <div className="App">
        <div className="Content">
          {
            this.state.isLoading ?
              <ClipLoader/>
              : (
                  <>
                    <TableWrapper
                    data={this.state.tableData}/>
                    <p>Tip: Click shift for multisort</p>
                  </>
              )
          }
        </div>
      </div>
    );
  }
}

export default App;
