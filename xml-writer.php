<?php 

@date_default_timezone_set("GMT"); 

$writer = new XMLWriter(); 
// Output directly to the user 

$writer->openURI('php://output'); 
$writer->startDocument('1.0'); 

$writer->setIndent(4); 

// declare it as an rss document 
$writer->startElement('rss'); 
$writer->writeAttribute('version', '2.0'); 
$writer->writeAttribute('xmlns:atom', 'http://www.w3.org/2005/Atom'); 


$writer->startElement("channel"); 
//---------------------------------------------------- 
//$writer->writeElement('ttl', '0'); 
$writer->writeElement('title', 'Latest Products'); 
$writer->writeElement('description', 'This is the latest products from our website.'); 
$writer->writeElement('link', 'http://www.domain.com/link.htm'); 
$writer->writeElement('pubDate', date("D, d M Y H:i:s e")); 
$writer->startElement('image'); 
$writer->writeElement('title', 'Latest Products'); 
$writer->writeElement('link', 'http://www.domain.com/link.htm'); 
$writer->writeElement('url', 'http://www.iab.net/media/image/120x60.gif'); 
$writer->writeElement('width', '120'); 
$writer->writeElement('height', '60'); 
$writer->endElement(); 
//---------------------------------------------------- 



//---------------------------------------------------- 
$writer->startElement("item"); 
$writer->writeElement('title', 'New Product 8'); 
$writer->writeElement('link', 'http://www.domain.com/link.htm'); 
$writer->writeElement('description', 'Description 8 Yeah!'); 
$writer->writeElement('guid', 'http://www.domain.com/link.htm?tiem=1234'); 

$writer->writeElement('pubDate', date("D, d M Y H:i:s e")); 

$writer->startElement('category'); 
$writer->writeAttribute('domain', 'http://www.domain.com/link.htm'); 
$writer->text('May 2008'); 
$writer->endElement(); // Category 

// End Item 
$writer->endElement(); 
//---------------------------------------------------- 


// End channel 
$writer->endElement(); 

// End rss 
$writer->endElement(); 

$writer->endDocument(); 

$writer->flush(); 
?>
