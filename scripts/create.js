const program = require('commander');

program.version?.( '0.0.1' )

// Commands
program
    .command('say' )
    .description( ' dice cosas locas' )
    .alias('s')
    .action( function ( name ){
        console.log( name )
    } )

// Options
program
    .option('-d, --do', 'Do something' )
    .action( function ( task ) {
        console.log(`Doing this ${task}`)
    })

program .parse( process.argv );
