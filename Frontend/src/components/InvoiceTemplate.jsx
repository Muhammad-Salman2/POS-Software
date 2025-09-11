import React from 'react';

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1C3333',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C3333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    color: '#1C3333',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#1C3333',
    paddingBottom: 5,
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  col1: {
    width: '40%',
  },
  col2: {
    width: '20%',
    textAlign: 'right',
  },
  col3: {
    width: '20%',
    textAlign: 'right',
  },
  col4: {
    width: '20%',
    textAlign: 'right',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#1C3333',
  },
  totalLabel: {
    fontWeight: 'bold',
    color: '#1C3333',
    marginRight: 10,
  },
  totalValue: {
    fontWeight: 'bold',
    color: '#1C3333',
  },
  footer: {
    marginTop: 30,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#1C3333',
    fontSize: 10,
    textAlign: 'center',
    color: '#666',
  },
});

const InvoiceTemplate = ({ sale }) => {
  const date = new Date(sale.createdAt);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>INVOICE</Text>
          <Text style={styles.subtitle}>Sale #{sale.id}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <View>
              <Text style={styles.label}>Date:</Text>
              <Text>{formattedDate} at {formattedTime}</Text>
            </View>
            <View>
              <Text style={styles.label}>Payment Method:</Text>
              <Text>{sale.paymentType}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Customer Details:</Text>
          <Text>{sale.customerName || 'Walk-in Customer'}</Text>
          {sale.customerEmail && <Text>{sale.customerEmail}</Text>}
          {sale.customerPhone && <Text>{sale.customerPhone}</Text>}
        </View>

        <View style={styles.section}>
          <View style={styles.tableHeader}>
            <Text style={styles.col1}>Product</Text>
            <Text style={styles.col2}>Price</Text>
            <Text style={styles.col3}>Qty</Text>
            <Text style={styles.col4}>Total</Text>
          </View>

          {sale.saleItems.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.col1}>{item.product.name}</Text>
              <Text style={styles.col2}>Rs.{item.product.price.toFixed(2)}</Text>
              <Text style={styles.col3}>{item.quantity}</Text>
              <Text style={styles.col4}>Rs.{(item.product.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))}

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount:</Text>
            <Text style={styles.totalValue}>Rs.{sale.totalAmount.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>Thank you for your business!</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceTemplate;