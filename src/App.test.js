import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { checkWinner } from './index';

row_win = [[null,null,null,null,null,null],
            [null,null,null,null,null,null],
            [null,null,null,null,null,"Y"],
            [null, null,null,null,"Y","R"],
            [null,null,null,"Y","Y","R"],
            [null,null,null,"Y","R","R"],
            [null,null,null,null,null,"R"]
            ]

test('test row win', () =>{
    expect(checkWinner(row_win, 3, 5).toBe(true))
})

