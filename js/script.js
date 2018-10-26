const API_publicKey = "FLWPUBK-24b72aebb821aea177483039677df9d3-X";

    function initializePayment(){

        const payload = {
            email: $('#email').val(),
            amount: $('#amount').val(),
            currency: $('#currency').val(),
            // phone: $('#phone').val()
        };

        // Data validation here?

        // Process payment with rave
        payWithRave(payload);
    }


    function payWithRave(payload) {

        var x = getpaidSetup({
            PBFPubKey: API_publicKey,
            customer_email: payload.email,
            amount: payload.amount,
            customer_phone: '0200338811',//payload.phone,
            currency: payload.currency,
            payment_method: "both",
            txref: "rave-123456",
            meta: [{
                metaname: "flightID",
                metavalue: "AP1234"
            }],
            onclose: function() {},
            callback: function(response) {
                var txref = response.tx.txRef; // collect flwRef returned and pass to a 					server page to complete status check.
                console.log("This is the response returned after a charge", response);
                if (
                    response.tx.chargeResponseCode == "00" ||
                    response.tx.chargeResponseCode == "0"
                ) {
                    // redirect to a success page
                } else {
                    // redirect to a failure page.
                }

                x.close(); // use this to close the modal immediately after payment.
            }
        });
    }