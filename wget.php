<?php
$sites = file_get_contents('wget-sites.txt');
$sites = json_decode($sites);

function get_web_page( $url )
{
    $options = array(
        CURLOPT_RETURNTRANSFER => true,     // return web page
        CURLOPT_HEADER         => false,    // don't return headers
        CURLOPT_FOLLOWLOCATION => true,     // follow redirects
        CURLOPT_ENCODING       => "",       // handle all encodings
        CURLOPT_USERAGENT      => "spider", // who am i
        CURLOPT_AUTOREFERER    => true,     // set referer on redirect
        CURLOPT_CONNECTTIMEOUT => 120,      // timeout on connect
        CURLOPT_TIMEOUT        => 120,      // timeout on response
        CURLOPT_MAXREDIRS      => 10,       // stop after 10 redirects
    );

    $ch      = curl_init( $url );
    curl_setopt_array( $ch, $options );
    $content = curl_exec( $ch );
    $err     = curl_errno( $ch );
    $errmsg  = curl_error( $ch );
    $header  = curl_getinfo( $ch );
    curl_close( $ch );

    $header['errno']   = $err;
    $header['errmsg']  = $errmsg;
    $header['content'] = $content;
    return $header;
}

function getSite($name, $url) {
    if (file_exists($name)) {
        $siteHTML = file_get_contents($name);
        return $siteHTML;
    }
   
    $html = get_web_page($url);

    print_r($html);

    if ($html['content'] !== FALSE) {
        file_put_contents($name, $html['content']);
    }

    return $html['content'];
   
}
foreach ($sites as $name => $url) {
    
    $html = getSite($name . ".html", $url);  

    if ($html !== false) {
    
        $dom = new DOMDocument();
        $dom->loadHTML($html);

        $xpath = new DOMXPath($dom);
        //$head = $xpath->query('//@robots');
        $head = $xpath->query('//head');

        print_r($head);
        echo "Site: " . ($head->item(0)->nodeValue) . "\n";

    }
}

?>