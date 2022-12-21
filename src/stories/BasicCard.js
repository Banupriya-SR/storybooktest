import * as React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export const BasicCard = ({userDetails}) => {
    const {name, website,address, email, phone}=userDetails

    return (
        <Card sx={{ minWidth: 275}}>
            <CardContent>
                <Typography variant="h5" data-testid="name" component="div" >
                    {name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} data-testid="email" color="text.secondary" gutterBottom>
                    Email: {email}
                </Typography>
                <Typography sx={{ mb: 1.5 }} data-testid="phone"  color="text.secondary">
                    Phone: {phone}
                </Typography>
                <Typography sx={{ mb: 1.5 }} data-testid="website" color="text.secondary">
                Website: {website}
                </Typography>
                <Typography sx={{ mb: 1.5 }} data-testid="address" color="text.secondary">
                   Address: {address}
                </Typography>
            </CardContent>
        </Card>
    );
}

Card.propTypes = {
    userDetails: PropTypes.shape({
        email: PropTypes.string,
        phone: PropTypes.string,
        name:PropTypes.string,
        address:PropTypes.string,
        website:PropTypes.string
        })
};

