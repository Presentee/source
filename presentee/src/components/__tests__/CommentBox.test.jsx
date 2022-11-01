import React from 'react';
import { render, screen } from '@testing-library/react';

import CommentBox from '../CommentBox';

describe('CommentBox', () => {
    test('renders CommentBox component', () => {
        render(<CommentBox />);
        
        screen.queryByText('Box for Comment');
    });
});