import React from 'react';
import { Button, Table } from 'react-bootstrap';

export default class DynamicTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRow: undefined,
            currentPage: 0,
        }
    }

    static defaultProps = {
        head: [],
        body: [],
        columns: undefined,
        action: () => { },
        pageNumber: 0,
        pageSize: 10,
    }

    async setSelectedRow(i) {
        this.setState({
            selectedRow: this.props.body[i]
        })
    }

    async handleClick(index) {
        let newIndex = this.props.pageSize * this.state.currentPage + index;
        await this.setSelectedRow(newIndex);
        this.props.action();
    }

    selectedRow() {
        return this.state.selectedRow;
    }

    currentPage() {
        return this.state.currentPage;
    }

    backPage() {
        this.setState({
            currentPage: this.state.currentPage - 1 > -1 ? this.state.currentPage - 1 : this.state.currentPage
        })
    }

    nextPage() {
        this.setState({
            currentPage: this.state.currentPage + 1 < this.props.body.length / this.props.pageSize ? this.state.currentPage + 1 : this.state.currentPage
        })
    };

    renderHead() {
        if (this.props.columns) {
            return (<>
                {this.props.columns.map((column, i) => {
                    let heading = "";
                    this.props.head.forEach(element => {
                        (element.value === column) && (heading = element.heading)
                    });
                    return <th key={i}>{heading}</th>;
                })}
            </>
            )
        }
        return (this.props.head.map((element, i) => {
            return <th key={i}>{element.heading}</th>
        }))
    }
    renderRow(element, i) {
        if (this.props.columns) {
            return (
                <tr key={i} data-index={i} onClick={() => this.handleClick(i)}>
                    {this.props.columns.map((column, j) => {
                        if (column.includes('.')) {
                            let itemSplit = column.split('.')
                            return <td key={j}>{element[itemSplit[0]][itemSplit[1]]}</td>
                        }

                        if (column === "id") {
                            return <td key={j}>{this.props.pageSize * this.state.currentPage + i + 1}</td>;
                        }
                        else {
                            return <td key={j}>{element[column]}</td>;
                        }
                    })}
                </tr>
            )
        }
        return (<tr key={i} data-index={i} onClick={() => this.handleClick(i)}>
            {Object.entries(element).map((value, j) => {
                return <td key={j}>{value}</td>;
            })}
        </tr>)
    }

    render() {
        return (
            <div>
                {
                    this.props.body.length > 0 ? (<>
                        <Table striped bordered hover >
                            <thead>
                                <tr>
                                    {
                                        this.renderHead()
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.values(this.props.body.slice(this.props.pageSize * this.state.currentPage, this.props.pageSize * this.state.currentPage + this.props.pageSize)).map((element, i) => {
                                        return this.renderRow(element, i);
                                    })
                                }
                            </tbody>
                        </Table>
                        <div className="row justify-content-md-end">
                            <div className="pagination-text">Filas por página: {this.props.pageSize}</div>
                            <div className="pagination-text">
                                {this.props.pageSize * this.state.currentPage + 1} - {this.props.pageSize * this.state.currentPage + this.props.pageSize > this.props.body.length ? this.props.body.length : this.props.pageSize * this.state.currentPage + this.props.pageSize} de {this.props.body.length}</div>
                            <div className="col-md-auto">
                                <Button className='pagination-button' variant="outline-primary" onClick={() => this.backPage()}><i className="bi bi-chevron-left"></i></Button>{" "}
                                <label className='pagination-page'>{this.state.currentPage + 1}</label>{" "}
                                <Button className='pagination-button' variant="outline-primary" onClick={() => this.nextPage()}>{<i className="bi bi-chevron-right"></i>}</Button>
                            </div>
                        </div>
                    </>) : (
                        <>
                            <div className='no-info-err-container no-info-err-table'>
                                <div className='vertical-align-parent'>
                                    <div className='vertical-align-child'>
                                        <i className="bi bi-table"></i>
                                        <h6>No se encontró información</h6>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        )
    }
}