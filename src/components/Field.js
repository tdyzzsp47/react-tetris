import React, { Component } from 'react'
import '../css/Field.css'

class Field extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className='field'>
                <table>
                    <tbody>
                        {this.props.field.map((row, index) => {
                            return (
                                <tr key={index}>
                                    {row.map((td, index) => {return(<td key={index} className={'block_type_'+td}/>)})}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Field