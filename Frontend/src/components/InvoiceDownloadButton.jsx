import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoiceTemplate from './InvoiceTemplate.jsx';
import { Download, Loader } from 'lucide-react';

const InvoiceDownloadButton = React.memo(({ sale }) => {
  return (
    <PDFDownloadLink
      document={<InvoiceTemplate sale={sale} />}
      fileName={`invoice_${sale.id}.pdf`}
      className="flex items-center gap-2 px-3 py-2 text-sm text-[#1C3333] hover:bg-[#1C3333]/10 rounded-md cursor-pointer w-full"
    >
      {({ loading }) => (
        loading ? (
          <>
            <Loader className="h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Download className="h-4 w-4" />
            Download Invoice
          </>
        )
      )}
    </PDFDownloadLink>
  );
});

InvoiceDownloadButton.displayName = 'InvoiceDownloadButton';
export default InvoiceDownloadButton;